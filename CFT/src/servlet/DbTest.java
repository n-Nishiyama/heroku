package servlet;

import java.util.List;

import dao.PersonalDAO;
import model.Personal;

public class DbTest {
	public static void main(String[] args) {

		// personalテーブルの全レコードを取得
		PersonalDAO personalDAO = new PersonalDAO();
		List<Personal> personalList = personalDAO.findAll();

		// 取得したレコードの内容を出力
		for (Personal personal : personalList) {
			System.out.println("ID:" + personal.getId());
			System.out.println("PW:" + personal.getPw());
			System.out.println("NAME:" + personal.getName());
			System.out.println("GROUPID:" + personal.getGroupId() + "\n");
		}

		// personalテーブルに値を追加
		// boolean box = personalDAO.add("00002", "1111", "hage", "0001");
		// System.out.println(box);

		// personalテーブルの値を削除
		// boolean box2 = personalDAO.remove("00002");
		// System.out.println(box2);

		// personalテーブルの値をID指定で取得
		personalList = personalDAO.findSearch("00001");

		// 取得したレコードの内容を出力
		for (Personal personal : personalList) {
			System.out.println("ID:" + personal.getId());
			System.out.println("PW:" + personal.getPw());
			System.out.println("NAME:" + personal.getName());
			System.out.println("GROUPID:" + personal.getGroupId() + "\n");
		}
	}
}