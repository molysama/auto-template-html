
export default (url, callback) => {

    const webview = ui.webview
    const set = webview.getSettings()

    set.setAllowFileAccessFromFileURLs(false)
    set.setAllowUniversalAccessFromFileURLs(false)
    set.setSupportZoom(false)
    set.setJavaScriptEnabled(true)
    webview.loadUrl(url)

    const webcc = new JavaAdapter(WebChromeClient, {
        onJsPrompt: function (view, url, fnName, defaultValue, jsPromptResult) {

            callback(fnName, defaultValue)

            jsPromptResult.confirm()
            return true
        },
        onReceivedHttpError: function (view, request, error) {
            log('webview http error', error)
        },
        onReceivedError: function (view, errorCode, desc, failingUrl) {
            log('webview error', desc)
        },
        onConsoleMessage: function (msg) {
            log(msg.message())
        }
    })

    webview.setWebChromeClient(webcc)
    return {
        webview,
        runHtmlFunction (fnName, value) {
            return new Promise((resolve, reject) => {
                webview.evaluateJavascript(`javascript:${fnName}(${value})`, new JavaAdapter(ValueCallback, {
                    onReceiveValue (result) {
                        resolve(result)
                    },
                    onReceivedError (error) {
                        reject(error)
                    } 
                }))
            })
        }
    }
}