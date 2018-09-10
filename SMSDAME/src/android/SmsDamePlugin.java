package com.dame.cordova.sms_port;
import android.provider.Settings;
import android.Manifest;
import android.app.Activity;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.content.Context;
import android.os.Build;
import android.content.Intent;
import android.telephony.SmsManager;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import android.widget.Toast;
import android.provider.Settings;
import android.net.Uri;
import java.io.File;
import org.json.JSONObject;

public class SmsDamePlugin extends CordovaPlugin {
  static final int REQUEST_INSTALL = 1;
   public final String ACTION_RECEIVE_SMS = "ecoute_reception_sms";
   public final String ACTION_SEND_SMS = "envoyersms";
   public final String ACTION_ENABLE_UNKNOWN_SOURCES="activer_source_inconnu";
   public final String ACTION_INSTALL_APK="install_apk";
   public final String ACTION_STATE_UNKNOWN_SOURCES="etat_sources_inconnu";
   private CallbackContext callbackReceive;
   private RecepteurSMS recepteurSMS = null;
   private boolean isReceiving = false;


    public SmsDamePlugin() {
        super();
    }

    @Override
    public boolean execute(String action, JSONArray parametres,
                           final CallbackContext callbackContext) throws JSONException {

        if (ACTION_RECEIVE_SMS.equals(action)) {
            EcouteReceptionSMS(parametres.optString(0),callbackContext);
            return true;
        }
        else if(ACTION_SEND_SMS.equals(action)) {
                           envoyerSMS(parametres.optString(0),parametres.optString(1),parametres.optInt(2),callbackContext);
                           return true;
    }
    else if(ACTION_ENABLE_UNKNOWN_SOURCES.equals(action)){
          ActiverSourcesInconnues(callbackContext);
          return true;
        }
        else if(ACTION_INSTALL_APK.equals(action)){
          installapk(callbackContext);
        }
        else if(ACTION_STATE_UNKNOWN_SOURCES.equals(action)){
          etatSourceInconnu(callbackContext);
          return true;
        }
    return false;
    }
    public void etatSourceInconnu(CallbackContext callbackContext){
      boolean isNonPlayAppAllowed = Settings.Secure.getInt(cordova.getActivity().getContentResolver(), Settings.Secure.INSTALL_NON_MARKET_APPS,0) == 1;
      String etat=isNonPlayAppAllowed?"OK":"NOK";
      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, etat));
    }
    public void installapk(CallbackContext callbackContext)
    {
      Intent intent = new Intent(Intent.ACTION_INSTALL_PACKAGE);

      intent.setData(Uri.fromFile( new File("/storage/emulated/0/proximo.apk")));
      intent.putExtra(Intent.EXTRA_NOT_UNKNOWN_SOURCE, true);
      intent.putExtra(Intent.EXTRA_ALLOW_REPLACE, true);
      intent.putExtra(Intent.EXTRA_RETURN_RESULT, true);
     // intent.putExtra(Intent.EXTRA_INSTALLER_PACKAGE_NAME, getApplicationInfo().packageName);
      //cordova.getActivity().startActivityForResult(new Intent(android.provider.Settings.ACTION_SECURITY_SETTINGS), 0);

      cordova.getActivity().startActivityForResult(intent, 0);
    }
    public void EcouteReceptionSMS(String port,CallbackContext callbackContext) {
        if (this.isReceiving) {
            PluginResult pluginResult = new PluginResult(
                    PluginResult.Status.NO_RESULT);
            pluginResult.setKeepCallback(false);
            this.callbackReceive.sendPluginResult(pluginResult);

        }
        this.isReceiving = true;

        if (this.recepteurSMS == null) {
            this.recepteurSMS = new RecepteurSMS();
           IntentFilter intent = new IntentFilter("android.intent.action.DATA_SMS_RECEIVED");
            intent.setPriority(10000);
            intent.addDataScheme("sms");
            intent.addDataAuthority("*",port);
           //intent.setPriority(IntentFilter.SYSTEM_HIGH_PRIORITY);
            this.cordova.getActivity().registerReceiver(this.recepteurSMS, intent);
        }

        this.recepteurSMS.startReceiving(callbackContext);

        PluginResult pluginResult = new PluginResult(
                PluginResult.Status.NO_RESULT);
        pluginResult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginResult);
        this.callbackReceive = callbackContext;
    }
    public void ActiverSourcesInconnues(CallbackContext callbackContext){


      boolean isNonPlayAppAllowed = Settings.Secure.getInt(cordova.getActivity().getContentResolver(), Settings.Secure.INSTALL_NON_MARKET_APPS,0) == 1;
      if (!isNonPlayAppAllowed) {
      //  Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
       // Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTING);
       // Intent intent = new Intent("android.settings.MANAGE_UNKNOWN_APP_SOURCES");
       // cordova.getActivity().startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES));
      //  Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
        //intent.setData(Uri.parse("package:" + this.cordova.getContext().getPackageName()));
        cordova.getActivity().startActivityForResult(new Intent(android.provider.Settings.ACTION_SECURITY_SETTINGS), 0);
      //  cordova.getActivity().startActivity(intent);
        callbackContext.success();

      }


    }

    public void  envoyerSMS(String telephone, String text, int port,CallbackContext callbackContext) {
             short p=(short) port;
                try{
                  SmsManager smsManager=SmsManager.getDefault();
                  smsManager.sendDataMessage(telephone,null,p,text.getBytes(),null,null);

                       // this.afficheToast(message);
                               // Toast.makeText(this.cordova.getActivity().getApplicationContext(),message,Toast.LENGTH_LONG).show();

                                 callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "Message envoyé avec succès !"));
                }
                catch (Exception e){
                       callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Erreur d'envoi du message"));
                }
    }
    public void afficheToast(String message)
    {
        Toast.makeText(this.cordova.getActivity().getApplicationContext(),message,Toast.LENGTH_LONG).show();
    }

}

