package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Personal;

public class PersonalDAO {
	//DB接続パス
	private String connectionString = "jdbc:h2:file:C:/Users/K/Desktop/work/SD-2017/H2DB/sd-2017db";
	
	public List<Personal> findAll() {

		Connection conn = null;
		List<Personal> personalList = new ArrayList<Personal>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM PERSONALTABLE";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String id = rs.getString("ID");
				String pw = rs.getString("PW");
				String name = rs.getString("NAME");
				String groupId = rs.getString("GROUPID");
				Personal personal = new Personal(id, pw, name, groupId);
				personalList.add(personal);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		} finally {

			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return personalList;
	}
	
	//ID指定で参照
	public List<Personal> findSearch(String searchId) {

		Connection conn = null;
		List<Personal> personalList = new ArrayList<Personal>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM PERSONALTABLE WHERE ID=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);
			
			//指定したIDで
			pStmt.setString(1, searchId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String id = rs.getString("ID");
				String pw = rs.getString("PW");
				String name = rs.getString("NAME");
				String groupId = rs.getString("GROUPID");
				Personal personal = new Personal(id, pw, name, groupId);
				personalList.add(personal);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		} finally {

			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return personalList;
	}
	
	//データ削除
	public boolean remove(String removeId) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// DELETE文を準備
			String sql = "DELETE FROM PERSONALTABLE WHERE ID=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, removeId);
			int r = pStmt.executeUpdate();

			return (r > 0);

		} catch (Exception e) {
			e.printStackTrace();
			return false;

		} finally {
			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return false;
				}
			}
		}
	}
	
	//データ追加
	public boolean add(String id, String pw, String name, String groupId) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// DELETE文を準備
			String sql = "INSERT INTO PERSONALTABLE (ID, PW, NAME, GROUPID) VALUES (?,?,?,?)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, id);
			pStmt.setString(2, pw);
			pStmt.setString(3, name);
			pStmt.setString(4, groupId);

			int r = pStmt.executeUpdate();

			return (r > 0);

		} catch (Exception e) {
			e.printStackTrace();
			return false;

		} finally {
			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return false;
				}
			}
		}
	}
}