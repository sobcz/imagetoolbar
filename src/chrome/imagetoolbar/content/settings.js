/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
 
 var settings = {

  onload: function ()
  {
    var customDirPref = document.getElementById("imagetoolbar.imageFolder");
    if (!customDirPref.value)
    {
      var fileLocator = Components.classes["@mozilla.org/file/directory_service;1"];
      var fileService = fileLocator.getService(Components.interfaces.nsIProperties);
      var dir = fileService.get("DeskP", Components.interfaces.nsILocalFile);
      customDirPref.value = dir;
    }
    settings.useFirefoxDirChange();
  },

  useFirefoxDirChange: function ()
  {
    var useFirefoxDir = document.getElementById("use_firefox_dir").value;
    document.getElementById("custom_folder_box").setAttribute("disabled",useFirefoxDir);
    document.getElementById("custom_folder_browse").setAttribute("disabled",useFirefoxDir);
    return undefined;
  },

  chooseFolder: function ()
  {
    const nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"]
                       .createInstance(nsIFilePicker);
    var strings = document.getElementById("imagetoolbarStrings");
    var title = strings.getString("choosedir");
    fp.init(window, title, nsIFilePicker.modeGetFolder);
    
    const nsILocalFile = Components.interfaces.nsILocalFile;
    var customDirPref = document.getElementById("imagetoolbar.imageFolder");
    if (customDirPref.value)
      fp.displayDirectory = customDirPref.value;
    fp.appendFilters(nsIFilePicker.filterAll);
    if (fp.show() == nsIFilePicker.returnOK) {
      var file = fp.file.QueryInterface(nsILocalFile);
      customDirPref.value = file;
    }
  },

  readDownloadDirPref: function ()
  {
    var downloadFolder = document.getElementById("custom_folder_box");
    var customDirPref = document.getElementById("imagetoolbar.imageFolder");
    
    if (customDirPref.value != null) {
      if (customDirPref.value.path == "undefined") {
        customDirPref.value.path = "C:\Desktop";
      }
    }
    
    downloadFolder.label = customDirPref.value ? customDirPref.value.path : "";

    var ios = Components.classes["@mozilla.org/network/io-service;1"]
                        .getService(Components.interfaces.nsIIOService);
    var fph = ios.getProtocolHandler("file")
                 .QueryInterface(Components.interfaces.nsIFileProtocolHandler);

    var currentDirPref = document.getElementById("imagetoolbar.imageFolder");    
    var downloadDir = currentDirPref.value;
    if (downloadDir != null && downloadDir.exists()) {
      var urlspec = fph.getURLSpecFromFile(downloadDir);
      downloadFolder.image = "moz-icon://" + urlspec + "?size=16";
    }
    
    return undefined;
  }
};

window.addEventListener("load",settings.onload,false);