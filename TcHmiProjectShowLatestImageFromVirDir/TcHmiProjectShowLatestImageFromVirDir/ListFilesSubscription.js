// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    let destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', (e, data) => {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------

        //Get the Image Control that is used in the Desktop.view
        var imgControl = TcHmi.Controls.get("TcHmiImage");

        //Create a new server subscription
        TcHmi.Server.subscribeEx([{
            symbol: "ListFiles",
            writeValue: "/images", //path that is defined in your Virtual Directory under the TcHmiSrv extension. 
            commandOptions: ["SendWriteValue", "SendErrorMessage"]
        }], TcHmi.Config.get().tcHmiServer.websocketIntervalTime, null, data => {            
            let d = new Date();
            //Need to add a timestamp to "trick" the browser that there is a new picture that needs to be shown, if the name of the new picture is the same, the browser will not see it as a new picture and update it.
            imgControl.setSrc("/images/download.jpg?a=" + d.getTime()); 
        });

    });
})(TcHmi);
