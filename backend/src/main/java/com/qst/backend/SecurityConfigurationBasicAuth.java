package com.qst.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfigurationBasicAuth {
    @Bean
    public PasswordEncoder encoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable().authorizeHttpRequests((authz) -> authz
//                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
//                        .antMatchers("/navigation/**").hasRole("CAPTAIN")
//                        .antMatchers("/cantina/**").hasRole("CREW")
                .anyRequest().authenticated()).httpBasic(Customizer.withDefaults());
        return http.build();
    }
}