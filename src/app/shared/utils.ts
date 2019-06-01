import {Facture} from './models/facture';
import { DatePipe } from '@angular/common';

declare var jsPDF: any;

export class Utils {

  public static convertToDate(date) {
    return new Date(date.substring(6), date.substring(0, 2) - 1, date.substring(3, 5));
  }


  generate() {

    var doc = new jsPDF('p', 'pt');

    var res = doc.autoTableHtmlToJson(document.getElementById('basic-table'));
    doc.autoTable(res.columns, res.data, {margin: {top: 80}});

    var header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text('Testing Report', data.settings.margin.center, 50);
    };

    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 20
    };

    doc.autoTable(res.columns, res.data, options);

    doc.save('table.pdf');
  }


  public static generate_cutomPDF(facture: Facture) {

    var
      facturePDF = {
        CODE: facture.CODE,
        NOM_PRENOM: facture.NOM_PRENOM,
        ADRESSE: facture.ADRESSE,
        TEL: facture.TEL,
        CIN: facture.CIN,
        Email: facture.reservation.client.EMAIL
       
      };

    var
      customer_BillingInfoJSON = {
        type: facture.reservation.chambre.type,
        nbJour: facture.reservation.client.NBRE_JOURS,
        checkIn: facture.reservation.checkIn,
      TEST: facture.DATE,
        NB_ADULT: facture.reservation.NB_ADULT,
        NB_ENF:facture.reservation.NB_ENF, 
              checkout: facture.reservation.checkOut,
        nbChamber: facture.reservation.NB_CHAMBRE
     
      };


   
    var
      invoiceJSON = {
        date: new Date().toString(),
        hotel: 'Paradies',
        Address: 'sfax,tunisie',
        TOTAL_HT : facture.TOTAL_HT,
              NET_A_PAYER: facture.NET_A_PAYER,
        TVA: facture.TVA,
        REMISE: facture.REMISE,
      
      };

    var
      company_logo = {
        src1:'data:image/png;base64,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',
        w: 80,
        h: 50
      };

    var
      fontSizes = {
        HeadTitleFontSize: 18,
        Head2TitleFontSize: 16,
        TitleFontSize: 14,
        SubTitleFontSize: 12,
        NormalFontSize: 10,
        SmallFontSize: 8
      };

    var
      lineSpacing = {
        NormalSpacing: 12,
      };

    var doc = new jsPDF('p', 'pt');

    var rightStartCol1 = 400;
    var rightStartCol2 = 480;


    var InitialstartX = 40;
    var startX = 40;
    var InitialstartY = 50;
    var startY = 0;

    var lineHeights = 12;

    var res = doc.autoTableHtmlToJson(document.getElementById('basic-table'));
    res = doc.autoTableHtmlToJson(document.getElementById('tblInvoiceItemsList'));

    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');

    //pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
    doc.addImage(company_logo.src1, 'PNG', startX, startY += 50, company_logo.w, company_logo.h);

    doc.textAlign(facturePDF.CODE, {align: 'left'}, startX, startY += 15 + company_logo.h);
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.textAlign('NOM Client', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign(facturePDF.NOM_PRENOM, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('ADRESSE', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(facturePDF.ADRESSE, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('TEL', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(facturePDF.TEL, {align: 'left'}, 180, startY);

    // doc.setFontType('bold');
    // doc.textAlign("Address", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    // doc.setFontType('normal');
    // doc.textAlign(facturePDF.CompanyAddressLine1, {align: "left"}, 80, startY);
    // doc.textAlign(facturePDF.CompanyAddressLine2, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);
    // doc.textAlign(facturePDF.CompanyAddressLine3, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);

    doc.setFontType('bold');
    doc.textAlign('CIN', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(facturePDF.CIN, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('EMAIL', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(facturePDF.Email, {align: 'left'}, 180, startY);

    
    var tempY = InitialstartY;


    doc.setFontType('bold');
    doc.textAlign('Date : ', {align: 'left'}, rightStartCol1, tempY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(invoiceJSON.date, {align: 'left'}, rightStartCol2, tempY);


    doc.setFontType('bold');
    doc.textAlign('Hotel : ', {align: 'left'}, rightStartCol1, tempY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(invoiceJSON.hotel, {align: 'left'}, rightStartCol2, tempY);

    doc.setFontType('bold');
    doc.textAlign('Address: ', {align: 'left'}, rightStartCol1, tempY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(invoiceJSON.Address, {align: 'left'}, rightStartCol2, tempY);

   
    // doc.writeText(0, tempY+=lineSpacing.NormalSpacing ,"INVOICE No  :  "+invoiceJSON.InvoiceNo + '     ', { align: 'right' });
    // doc.writeText(0, tempY+=lineSpacing.NormalSpacing ,"INVOICE Date: "+invoiceJSON.InvoiceDate + '     ', { align: 'right' });
    // doc.writeText(0, tempY+=lineSpacing.NormalSpacing ,"Reference No: "+invoiceJSON.RefNo + '     ', { align: 'right' });
    // doc.writeText(0, tempY+=lineSpacing.NormalSpacing ,"Total       :  Rs. "+invoiceJSON.TotalAmnt + '     ', { align: 'right' });

    doc.setFontType('normal');

    doc.setLineWidth(1);
    // doc.line(20, startY+lineSpacing.NormalSpacing, 580, startY+=lineSpacing.NormalSpacing);
    doc.line(20, startY + lineSpacing.NormalSpacing, 220, startY + lineSpacing.NormalSpacing);
    doc.line(380, startY + lineSpacing.NormalSpacing, 580, startY + lineSpacing.NormalSpacing);

    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.textAlign('Facture', {align: 'center'}, startX, startY += lineSpacing.NormalSpacing + 2);

    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');

    //-------Customer Info Billing---------------------
    var startBilling = startY;

    doc.textAlign('Resrvation details :', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
  

    // doc.setFontType('bold');
    // doc.textAlign("PAN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    // doc.setFontType('normal');
    // doc.textAlign(customer_BillingInfoJSON.CustomerPAN, {align: "left"}, 80, startY);

    doc.setFontType('bold');
    doc.textAlign('NB_ADULT', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.NB_ADULT, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('NB_ENF', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.NB_ENF, {align: 'left'}, 180, startY);
  
    doc.setFontType('bold');
    doc.textAlign('Date', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.TEST, {align: 'left'}, 180, startY);
  


    doc.setFontType('bold');
    doc.textAlign('checkIn', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.checkIn, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('checkout', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.checkout, {align: 'left'}, 180, startY);

    doc.setFontType('bold');
    doc.textAlign('nbChamber', {align: 'left'}, startX, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign(customer_BillingInfoJSON.nbChamber, {align: 'left'}, 180, startY);

 

    //-------Customer Info Shipping---------------------
    var rightcol1 = 340;
    var rightcol2 = 400;

    startY = startBilling;
   

    // doc.setFontType('bold');
    // doc.textAlign("PAN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    // doc.setFontType('normal');
    // doc.textAlign(customer_BillingInfoJSON.CustomerPAN, {align: "left"}, 80, startY);




    var header = function (data) {
      doc.setFontSize(8);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      // doc.textAlign("TAX INVOICE", {align: "center"}, data.settings.margin.left, 50);

      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      // doc.text("Testing Report", 110, 50);
    };
    // doc.autoTable(res.columns, res.data, {margin: {top:  startY+=30}});
    doc.setFontSize(8);
    doc.setFontStyle('normal');

    var options = {
      beforePageContent: header,
      margin: {
        top: 50
      },
      styles: {
        overflow: 'linebreak',
        fontSize: 8,
        rowHeight: 'auto',
        columnWidth: 'wrap'
      },
      columnStyles: {
        1: {columnWidth: 'auto'},
        2: {columnWidth: 'auto'},
        3: {columnWidth: 'auto'},
        4: {columnWidth: 'auto'},
        5: {columnWidth: 'auto'},
        6: {columnWidth: 'auto'},
      },
      startY: startY += 50
    };
    // columnStyles: {
    //   id: {fillColor: 255}
    // },

    //doc.autoTable(columns, rows, options);   //From dynamic data.
    // doc.autoTable(res.columns, res.data, options); //From htmlTable
    //-------Invoice Footer---------------------
    var rightcol1 = 340;
    var rightcol2 = 470;

    startY = doc.autoTableEndPosY() + 300;
    doc.setFontSize(fontSizes.NormalFontSize);

   
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');
    doc.textAlign('TVA', {align: 'left'}, rightcol1, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign(invoiceJSON.TVA.toString(), {align: 'left'}, rightcol2, startY);


    doc.setFontType('bold');
    doc.textAlign('REMISE', {align: 'left'}, rightcol1, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign(invoiceJSON.REMISE.toString(), {align: 'left'}, rightcol2, startY);




    doc.setFontType('bold');
    doc.textAlign('NET_A_PAYER', {align: 'left'}, rightcol1, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign(invoiceJSON.NET_A_PAYER.toString(), {align: 'left'}, rightcol2, startY);


    doc.setFontType('bold');
    doc.textAlign('Total hors taxe.', {align: 'left'}, rightcol1, startY += lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign(invoiceJSON.TOTAL_HT.toString(), {align: 'left'}, rightcol2, startY);
    doc.setFontType('bold');
    doc.textAlign('facture Code : ' + facturePDF.CODE + ',', {align: 'center'}, rightcol2, startY += lineSpacing.NormalSpacing + 50);
    doc.textAlign('signature', {align: 'center'}, rightcol2, startY += lineSpacing.NormalSpacing + 50);
let d = new Date();
    doc.save(d+'.pdf');
  }
}
