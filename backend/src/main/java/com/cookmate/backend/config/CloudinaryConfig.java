
package com.cookmate.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dpet2uqcr",
            "api_key", "576788197596682",
            "api_secret", "1eJ-V6GmAG8kJSUTY81L4t-NlJ8"
        ));
    }
}
