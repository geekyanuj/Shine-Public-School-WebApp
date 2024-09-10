package com.shinepublicschool.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
//    configured permitAll()
//    @Bean
//    SecurityFilterChain defSecurityFilterChain(HttpSecurity http)throws Exception{
//        http.authorizeHttpRequests((request)->request.anyRequest().permitAll());
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());
//        return http.build();
//    }


//    configured denyAll()
//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//        http.authorizeHttpRequests((request)->request.anyRequest().denyAll());
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());
//        return http.build();
//    }

    //configured custom security
//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//        http.authorizeHttpRequests((request)->request
//                .requestMatchers("/").permitAll()
//                .requestMatchers("/home").permitAll()
//                .requestMatchers("/contact").authenticated()
//                .requestMatchers("/holidays/**").permitAll()
//                .requestMatchers("/saveMsg").permitAll()
//                .requestMatchers("/courses").permitAll()
//                .requestMatchers("/about").permitAll()
//                .requestMatchers("/assets/**").permitAll()
//        );
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());
//        return http.build();
//    }

    //configured CSRF disabled
//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests((request) -> request
//                .requestMatchers("/").permitAll()
//                .requestMatchers("/home").authenticated()
//                .requestMatchers("/contact").permitAll()
//                .requestMatchers("/holidays/**").permitAll()
//                .requestMatchers("/saveMsg").permitAll()
//                .requestMatchers("/courses").permitAll()
//                .requestMatchers("/about").permitAll()
//                .requestMatchers("/assets/**").permitAll()
//        );
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());
//        http.csrf(AbstractHttpConfigurer::disable);
//        return http.build();
//    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((request) -> request
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/home").permitAll()
                        .requestMatchers("/dashboard").authenticated()
                        .requestMatchers("/displayMessages").hasRole("ADMIN")
                        .requestMatchers("/closeMsg/**").hasRole("ADMIN")
                        .requestMatchers("/reopenMsg/**").hasRole("ADMIN")
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/logout").permitAll()
                        .requestMatchers("/contact").permitAll()
                        .requestMatchers("/holidays/**").permitAll()
                        .requestMatchers("/saveMsg").permitAll()
                        .requestMatchers("/courses").permitAll()
                        .requestMatchers("/about").permitAll()
                        .requestMatchers("/assets/**").permitAll()
                        .requestMatchers("/public/**").permitAll()
//                        .requestMatchers(PathRequest.toH2Console()).permitAll() //no need of it. Since We are using MySQL
                )
                .formLogin((formLogin) -> formLogin
                        .loginPage("/login")
                        .defaultSuccessUrl("/dashboard")
                        .failureUrl("/login?error=true").permitAll()
                )
                .logout((logout) -> logout.logoutSuccessUrl("/login?logout=true").invalidateHttpSession(true).permitAll()
                )
//                .rememberMe(Customizer.withDefaults()
//                )
                .httpBasic(Customizer.withDefaults()
                )
//                .csrf(AbstractHttpConfigurer::disable);
                .csrf((csrf)->csrf.ignoringRequestMatchers("/saveMsg").ignoringRequestMatchers("/public/**")); //.ignoringRequestMatchers(PathRequest.toH2Console())); //no need of it. Since we are using MySQL
//        http.headers((headers)->headers.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable())); //similarly we don't need this frame since we are not using H2 database
        return http.build();
    }


//    no need of this now we are using Authentication Provider
  /*  @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{noop}123")
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password("{noop}user")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(admin, user);

    }*/
}
