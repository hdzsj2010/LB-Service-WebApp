package com.locationshare.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.locationshare.app.dao.UserDao;
import com.locationshare.app.model.Message;
import com.locationshare.app.model.User;
import com.locationshare.app.service.UserService;
/**
 * @author Jason_zh
 * @date 2016年6月1日
 * @version 1.0
 */
@Service("userService")
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao userDao;
	
	public User getUserById(int userid){
		return userDao.selectByPrimaryKey(userid);
	}
	
	public User getUserByName(String name){
		return userDao.getUserByName(name);
	}
	
	public int register(User user){
		try {
			return userDao.register(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public String login(User user,HttpSession session){
		User user_check = userDao.getUserByName(user.getUsername());
		if(user_check==null)
			return "2";  //用户不存在
		else{
			if (user_check.getPassword().equals(user.getPassword())) {
				session.setAttribute("user", user_check);
				return "1"; //登录成功
			}else{
				return "3";  //密码错误
			}
		}
	}
	
	public boolean isNameExist(String username){
		User user = userDao.getUserByName(username);
		if(user==null)
			return false;
		else
			return true;
	}
	
	public List<User> findFriends(int id){
		return userDao.findFriends(id);
	}
	
	public List<Message> getLastMessages(int uid,int fid){
		return userDao.getLastMessages(uid,fid);
	}
}
