package com.hundsun.xuxp10575.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SaltHash 
{
	public static String getMd5(String plainText) 
	{  
		try {  
			MessageDigest md = MessageDigest.getInstance("MD5"); 
			byte[] salt = "xuxinpeng".getBytes();
			md.update(salt);
			md.update(plainText.getBytes());  
			byte b[] = md.digest();  
			int i;  

			StringBuffer buf = new StringBuffer("");  
			for (int offset = 0; offset < b.length; offset++) {  
				i = b[offset];  
				if (i < 0)  
					i += 256;  
				if (i < 16)  
					buf.append("0");  
				buf.append(Integer.toHexString(i));  
			}  
			//32位加密  
			return buf.toString();  
			// 16位的加密  
			//return buf.toString().substring(8, 24);  
		} catch (NoSuchAlgorithmException e) {  
			e.printStackTrace();  
			return null;  
		}  
	}
}
