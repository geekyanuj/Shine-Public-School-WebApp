package com.shinepublicschool.aspects;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ShinePublicSchoolInfoContributor implements InfoContributor {
    @Override
    public void contribute(Info.Builder builder) {
        Map<String,String> infoMap = new HashMap<>();
        infoMap.put("App Name","Shine Public School WebApp");
        infoMap.put("App Description","Shine Public School Web Application for Students and Admin");
        infoMap.put("App Version","1.0.0");
        infoMap.put("Contact Email","info@shinepublicschool.com");
        infoMap.put("Contact Mobile","9065226268");
        builder.withDetail("shinepublicschool-info",infoMap);
    }
}
