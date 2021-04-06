package com.devcix.backend_comisaria_jlo.utils;

import com.devcix.backend_comisaria_jlo.model.Denuncias;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.awt.Color;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import javax.servlet.http.HttpServletResponse;

public class ExportarPDF {

    private List<Denuncias> getDenuncias;

    public ExportarPDF() {

    }

    public ExportarPDF(List<Denuncias> getDenuncias) {
        this.getDenuncias = getDenuncias;
    }

    public void writeHeader(PdfPTable pdfTable) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.DARK_GRAY);
        cell.setPadding(8);
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.white);

        cell.setPhrase(new Phrase("Id", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Tipo Denuncia", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Fecha Denuncia", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Policia", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Distrito", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Dirección", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Referencia", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Vínculo Parte Denunciada", font));
        pdfTable.addCell(cell);
    }
    
    private String formatearFecha(Date d){
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(d);
        return calendar.get(Calendar.DAY_OF_MONTH) + "-" + calendar.get(Calendar.MONTH + 1) + "-" + calendar.get(Calendar.YEAR);
    }
 

    public void writeTableData(PdfPTable pdfPTable) {
        for (Denuncias denuncia : getDenuncias) {
            pdfPTable.addCell(String.valueOf(denuncia.getId()));
            pdfPTable.addCell(String.valueOf(denuncia.getTipoDenuncia().getTipoDenuncia()));
            pdfPTable.addCell(this.formatearFecha(denuncia.getFechaDenuncia()));
            pdfPTable.addCell(String.valueOf(denuncia.getPolicia().getNombresCompletos()));
            pdfPTable.addCell(String.valueOf(denuncia.getDistrito().getDistrito()));
            pdfPTable.addCell(String.valueOf(denuncia.getDireccion()));
            pdfPTable.addCell(String.valueOf(denuncia.getReferenciaDireccion()));
            pdfPTable.addCell(String.valueOf(denuncia.getVinculoParteDenunciada().getNombre()));
            
        }
    }
    
    public void export(HttpServletResponse response){
        try(Document document = new Document(PageSize.A4.rotate())){
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();
            
            Font font = FontFactory.getFont(FontFactory.HELVETICA);
            font.setSize(20);
            font.setColor(Color.BLACK);
            //Titulo del archivo
            Paragraph paragraph = new Paragraph("Reportes de Denuncias", font);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);
            
            document.add(paragraph);
            
            PdfPTable pdfPTable = new PdfPTable(8);
            pdfPTable.setWidthPercentage(100f);
            pdfPTable.setWidths(new float[]{1.0f,3.0f,3.5f,3.0f,3.5f,5.0f,5.0f,2.5f});
            pdfPTable.setSpacingBefore(10);
            
            writeHeader(pdfPTable);
            writeTableData(pdfPTable);
            
            document.add(pdfPTable);
            document.close();
        }catch(Exception e){
            System.err.println("Error" + e.getMessage());
        }
    }
}
