
export default (url, callback) => {

    const webview = ui.webview
    const set = webview.getSettings()

    set.setAllowFileAccessFromFileURLs(false)
    set.setAllowUniversalAccessFromFileURLs(false)
    set.setSupportZoom(false)
    set.setJavaScriptEnabled(true)
    webview.loadUrl(url)

    const webcc = new JavaAdapter(WebChromeClient, {
        onJsPrompt: function (webView, url, fnName, defaultValue, jsPromptResult) {

            callback(fnName, defaultValue)

            jsPromptResult.confirm()
            return true
        }
    })
    webview.setWebChromeClient(webcc)

}