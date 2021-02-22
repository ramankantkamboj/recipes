package com.recipes;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.facebook.react.modules.i18nmanager.I18nUtil;
import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "recipes";
  }

   @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); 
    super.onCreate(savedInstanceState);
  }
}
