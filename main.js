"ui";

ui.statusBarColor('#000000')

importClass(android.webkit.WebView)
importClass(android.webkit.WebChromeClient)
importClass(android.webkit.WebResourceResponse)
importClass(android.webkit.WebViewClient)

ui.layout(
    <linear w="*" h="*">
        <webview id="webview" h="*" w="*" />
    </linear>
)

require('dist/app')