package locationshare;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;  
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;  
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;  
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*; 

/**
 * @author Jason_zh
 * @date 2016年6月1日
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)		//表示继承了SpringJUnit4ClassRunner类
@WebAppConfiguration
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml","classpath:spring-mvc.xml"})
//当然 你可以声明一个事务管理 每个单元测试都进行事务回滚 无论成功与否  
@TransactionConfiguration(defaultRollback = true)  
//记得要在XML文件中声明事务哦~~~我是采用注解的方式  
@Transactional  
public class UserTest {
	//private static Logger logger = Logger.getLogger(UserTest.class);
	
	@Autowired
	private WebApplicationContext wac;
	
	private MockMvc mockMvc;
	
	//private UserService userService;

	@Before
	public void setup() {
		// webAppContextSetup 注意上面的static import  
        // webAppContextSetup 构造的WEB容器可以添加fileter 但是不能添加listenCLASS  
        // WebApplicationContext context =  
        // ContextLoader.getCurrentWebApplicationContext();  
        // 如果控制器包含如上方法 则会报空指针  
        this.mockMvc = webAppContextSetup(this.wac).build();
	}

	@Test
	public void test1() throws Exception {
		//User user = userService.getUserById(1);
		// System.out.println(user.getUserName());
		// logger.info("值："+user.getUserName());
		mockMvc.perform((get("/mvc/user/1"))).andExpect(status().isOk())
		.andDo(print());
		//logger.info(JSON.toJSONString(user));
	}
}
