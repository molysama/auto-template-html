
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

            callback(fnName, defaultValue, webview)

            jsPromptResult.confirm()
            return true
        },
        onReceivedHttpError: function (view, request, error) {
            log(error)
        },
        onReceivedError: function (view, errorCode, desc, failingUrl) {
            log(error)
        },
        onConsoleMessage: function (msg) {
            log(msg.message())
        }
    })

    webview.setWebChromeClient(webcc)
    return webview
}