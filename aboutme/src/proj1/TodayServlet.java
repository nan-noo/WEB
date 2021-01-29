package proj1;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/today")
public class TodayServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public TodayServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		
		out.println("<a href='index.html'>메인화면<a>");
		
		
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter form = DateTimeFormatter.ofPattern("yyyy/M/d hh:mm");
		String nowStr = now.format(form);
		
		out.println("<h1>현재시간: " + nowStr + "</h1>");
		
	}

}
