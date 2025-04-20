
package com.vocabflip.app;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Ensure the app uses the WebView instead of a browser
        setContentView(com.getcapacitor.android.R.layout.bridge_layout_main);
    }
}
