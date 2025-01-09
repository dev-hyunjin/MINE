package com.app.mine.controller;

import com.app.mine.service.UserService;
import com.app.mine.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user/*")
@RequiredArgsConstructor
@Slf4j
public class UserRestController {

    private final JavaMailSender mailSender;
    private final UserService userService;

    @PostMapping("login")
    public Map<String, Object> login(String userEmail, String userPassword, HttpSession session) {
        UserVO loginUser = userService.getUserInfo(userEmail, userPassword);
        HashMap<String, Object> result = new HashMap<>();
        if(loginUser == null) {
            result.put("login", null);
            return result;
        }
        session.setAttribute("userInfo", loginUser);
        result.put("userEmail", loginUser.userEmail);
        result.put("valid", true);
        return result;
    }

    @PostMapping("check-email")
    public boolean checkEmail(String userEmail) {
        UserVO userInfo = userService.getUserInfo(userEmail, null);

        return userInfo == null;
    }

    @PostMapping("join")
    public void join(String userEmail, String userPassword, String userNickname, String userAddress, String userAddressDetail, Integer userCategory1, Integer userCategory2, Integer userCategory3) {
        UserVO userVO = new UserVO();

        userVO.setUserEmail(userEmail);
        userVO.setUserPassword(userPassword);
        userVO.setUserNickname(userNickname);
        userVO.setUserAddress(userAddress);
        userVO.setUserAddressDetail(userAddressDetail);
        userVO.setUserCategory1(userCategory1);
        userVO.setUserCategory2(userCategory2);
        userVO.setUserCategory3(userCategory3);

        userService.saveUser(userVO);
    }

    @PostMapping("getMyInfo")
    public UserVO getMyInfo(HttpSession session) {
        UserVO userInfo = (UserVO)session.getAttribute("userInfo");
        return userService.getMyInfo(userInfo);
    }

    @PostMapping("send-email")
    public void sendEmail(String userEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setFrom("disappointed123419@gmail.com");
//        from 값을 설정하지 않으면 application.properties의 username값이 설정됩니다.
        message.setSubject(userEmail + "님, 새 비밀번호 설정 링크입니다.");

        String key = userEmail + ".enc";
        key = Base64.getEncoder().encodeToString(key.getBytes());

        message.setText(userEmail + "님, 비밀번호 재설정 하시기 바랍니다.\n" + "링크: http://127.0.0.1:5173/changePassword?userEmail=" + userEmail + "&key=" + key);

        mailSender.send(message);
    }

    @PostMapping("check-key")
    public boolean checkKey(String userEmail, String key) {
        return new String(Base64.getDecoder().decode(key)).equals(userEmail + ".enc");
    }

    @GetMapping("logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
