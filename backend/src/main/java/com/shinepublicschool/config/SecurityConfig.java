package com.shinepublicschool.config;

import com.shinepublicschool.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${shinepublicschool.cors.allowed-origin}")
    private String allowedOrigin;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORS configured via bean below
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disable CSRF — stateless JWT API doesn't need it
            .csrf(AbstractHttpConfigurer::disable)
            // Stateless session — no HttpSession
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                    // Public auth endpoints
                    .requestMatchers("/api/auth/**").permitAll()
                    // Public read-only endpoints
                    .requestMatchers(HttpMethod.GET, "/api/holidays/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/courses").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/about").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/notices/public").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                    // Actuator health check
                    .requestMatchers("/actuator/health").permitAll()
                    // Admin-only endpoints
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    // All other /api/** require authentication
                    .requestMatchers("/api/**").authenticated()
                    .anyRequest().denyAll()
            )
            // Insert JWT filter before Spring's username/password filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
