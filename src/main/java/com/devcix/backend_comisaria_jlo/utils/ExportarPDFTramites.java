package com.devcix.backend_comisaria_jlo.utils;

import com.devcix.backend_comisaria_jlo.model.Tramite;
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
import java.util.Calendar;
import java.sql.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

public class ExportarPDFTramites {

    private List<Tramite> getTramites;

    public ExportarPDFTramites() {
    }

    public ExportarPDFTramites(List<Tramite> getTramites) {
        this.getTramites = getTramites;
    }

    public void writeHeader(PdfPTable pdfTable) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.darkGray);
        cell.setPadding(8);
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.white);

        cell.setPhrase(new Phrase("Id", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Cod-Trámite", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Tipo Trámite", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Fecha Trámite", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Policia", font));
        pdfTable.addCell(cell);
        cell.setPhrase(new Phrase("Usuario", font));
        pdfTable.addCell(cell);
    }

    private String formatearFecha(Date d) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(d);
        return calendar.get(Calendar.DAY_OF_MONTH) + "-" + calendar.get(Calendar.MONTH + 1) + "-" + calendar.get(Calendar.YEAR);
    }

    public void writeTableData(PdfPTable pdfPTable) {
        for (Tramite tramites : getTramites) {
            pdfPTable.addCell(String.valueOf(tramites.getId()));
            pdfPTable.addCell(String.valueOf(tramites.getCodTramite()));
            pdfPTable.addCell(String.valueOf(tramites.getTipoTramite()));
            pdfPTable.addCell(this.formatearFecha(tramites.getFechaTramite()));
            pdfPTable.addCell(String.valueOf(tramites.getPolicia().getNombreCompleto()));
            pdfPTable.addCell(String.valueOf(tramites.getUsuario().getNombreCompleto()));

        }
    }

    public void export(HttpServletResponse response) {
        try (Document document = new Document(PageSize.A4.rotate())) {
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA);
            font.setSize(20);
            font.setColor(Color.BLACK);
            //Titulo del archivo
            Paragraph paragraph = new Paragraph("Reportes de Trámites", font);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(paragraph);

            PdfPTable pdfPTable = new PdfPTable(8);
            pdfPTable.setWidthPercentage(100f);
            pdfPTable.setWidths(new float[]{1f, 3.0f, 5.0f, 4.0f, 6.5f, 6.0f});
            pdfPTable.setSpacingBefore(10);

            writeHeader(pdfPTable);
            writeTableData(pdfPTable);

            document.add(pdfPTable);
            document.close();
        } catch (Exception e) {
            System.err.println("Error" + e.getMessage());
        }
    }

}
