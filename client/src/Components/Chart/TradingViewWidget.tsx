import React from "react";

const TradingViewWidget: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 500, margin: "0 auto" }}>
      <iframe
        title="TradingView Chart"
        // src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=NI225&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Asia%2FTokyo&withdateranges=1&hidevolume=1&hideideas=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=ja"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=TVC:NI225&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Asia%2FTokyo&withdateranges=1&hidevolume=1&hideideas=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=ja"
        width="100%"
        height="500"
        frameBorder="0"
        allowFullScreen
        style={{ minHeight: 400, border: 0 }}
      ></iframe>
    </div>
  );
};

export default TradingViewWidget;
