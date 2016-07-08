package com.locationshare.app.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.locationshare.app.model.Message;
import com.locationshare.app.model.User;
/**
 * @author Jason_zh
 * @date 2016Äê6ÔÂ1ÈÕ
 * @version 1.0
 */
public interface UserService {

	public User getUserById(int userId);
	
	public int register(User user);
	
	public String login(User user,HttpSession session);
	
	public boolean isNameExist(String username);
	
	public List<User> findFriends(int id);
	
	public User getUserByName(String name);
	
	public List<Message> getLastMessages(int uid,int fid);
}
