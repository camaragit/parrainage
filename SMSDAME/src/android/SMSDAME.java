package cordova.plugin.sms.port.dame;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.telephony.SmsManager;
import org.json.JSONArray;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.IntentFilter;
import android.widget.Toast;
/**
 * This class echoes a string called from JavaScript.
 */
public class SMSDAME extends CordovaPlugin {
  static final int REQUEST_INSTALL = 1;
  public final String ACTION_RECEIVE_SMS = "ecoute_reception_sms";
  public final String ACTION_SEND_SMS = "envoyersms";
  public final String ACTION_ENABLE_UNKNOWN_SOURCES="activer_source_inconnu";
  public final String ACTION_INSTALL_APK="install_apk";
  public final String ACTION_STATE_UNKNOWN_SOURCES="etat_sources_inconnu";
  private CallbackContext callbackReceive;
  private RecepteurSMS recepteurSMS = null;
  private boolean isReceiving = false;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        if(action.equals(ACTION_RECEIVE_SMS))
        {
          String port = args.getString(0);
          this.EcouteReceptionSMS(port,callbackContext);
          return true;
        }
        if(action.equals(ACTION_SEND_SMS))
        {
          this.envoyerSMS(args,callbackContext);
          return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
          Toast.makeText(cordova.getActivity().getWindow().getContext(), message,
            Toast.LENGTH_SHORT).show();
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
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

  public void  envoyerSMS(JSONArray args ,CallbackContext callbackContext) {

    if(args != null) {
      try {
        String telephone = args.getJSONObject(0).getString("telephone");
        String text = args.getJSONObject(0).getString("text");
        int port = Integer.parseInt(args.getJSONObject(0).getString("port"));
        short p=(short) port;
        SmsManager smsManager=SmsManager.getDefault();
        smsManager.sendDataMessage(telephone,null,p,text.getBytes(),null,null);

        // this.afficheToast(message);
        // Toast.makeText(this.cordova.getActivity().getApplicationContext(),message,Toast.LENGTH_LONG).show();

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "Message envoyé avec succès !"));

        //callback.success(""+ (p1+p2) );
      }
      catch(Exception e) {
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Erreur d'envoi du message"));

        //  callback.error("Something went wrong " + e);
      }
    }
    else {
      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Arguments non définis"));

    //  callback.error("Something went wrong");
    }

  }
}
