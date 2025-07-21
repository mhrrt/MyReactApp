//utils/ShareMe.js
import { captureRef } from "react-native-view-shot";
// import { Share } from "react-native";
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


export default class ShareMe {
    /**
     * Capture a view as image and share
     * @param {Object} viewRef - ref of the view you want to capture
     */
    
    static async shareViewAsImage(viewRef, tabName = 'Panchang') {

        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality:'0.8',
            });
  
            // var message = "Check out Panchang based on exact location!! Download our app Free for more details\n\n https://play.google.com/store/apps/details?id=com.tinfocorp.ramshalaka"
            // if (tabName == "Horoscope") {
            //     message = "The universe left you a message... it’s in your horoscope 📩✨\n Download our app Free for more such things\n\n https://play.google.com/store/apps/details?id=com.tinfocorp.ramshalaka";
            // }

            const appLink = "https://play.google.com/store/apps/details?id=com.tinfocorp.ramshalaka";

            let message = `✨ Check out Panchang based on your exact location!\n\n📲 Download To Get Access Daily: ${appLink}`;

            if (tabName === "Horoscope") {
                 message = `🔮 The universe left you a message... it's in your horoscope!\n\n📲 Download For Daily Access: ${appLink}`;
        }
            await Share.open({
                message,
                url: uri,
                type: 'image/png',
            });

            
            await Share.share
        
        } catch (error) {
            console.error('Error sharing image', error);
        }
    }

    /**
     * Create and share a PDF from HTML content
     * @param {string} htmlContent -HTML string content
     * @param {string} fileName - file name for the PDF
     */

    static async shareAsPDF(htmlContent, fileName = 'panchang-details') {
        try {
            const options = {
                html: htmlContent,
                fileName: fileName,
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            await Share.open({
                url: 'file://${file.filePath}',
                type:'application/pdf',
            });
        } catch (error) {
            console.error('Error sharing PDF', error);
        }
    }
}