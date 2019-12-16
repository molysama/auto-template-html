
export default (url, callback) => {

    importClass(android.webkit.WebView)
    importClass(android.webkit.ValueCallback)
    importClass(android.webkit.WebChromeClient)
    importClass(android.webkit.WebResourceResponse)
    importClass(android.webkit.WebViewClient)

    ui.layout(`
        <linear w="*" h="*">
            <webview id="webview" h="*" w="*" />
        </linear>
    `)

    const webview = ui.webview
    const set = webview.getSettings()

    set.setAllowFileAccessFromFileURLs(false)
    set.setAllowUniversalAccessFromFileURLs(false)
    set.setSupportZoom(false)
    set.setJavaScriptEnabled(true)
    webview.loadUrl(url)

    const webcc = new JavaAdapter(WebChromeClient, {
        onJsPrompt: function (view, url, fnName, defaultValue, jsPromptResult) {

            let result = callback(fnName, defaultValue && JSON.parse(defaultValue))
            jsPromptResult.confirm(result && JSON.stringify(result))
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
        },
        runHtmlJS (propertyName) {
            return new Promise((resolve, reject) => {
                webview.evaluateJavascript(`javascript:${propertyName}`, new JavaAdapter(ValueCallback, {
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