package com.locationshare.app.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.locationshare.app.model.Message;
import com.locationshare.app.model.User;
/**
 * @author Jason_zh
 * @date 2016Äê6ÔÂ1ÈÕ
 * @version 1.0
 */
@Repository
public interface UserDao {
	
	public User selectByPrimaryKey(int id);
	
	public int register(User user);
	
	public User getUserByName(String name);
	
	public List<User> findFriends(int id);
	
	public List<Message> getLastMessages(@Param("uid")int uid,@Param("fid")int fid);
	
}
