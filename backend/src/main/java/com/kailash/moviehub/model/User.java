package com.kailash.moviehub.model;

import com.kailash.moviehub.utils.AuthoritiesConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity implements UserDetails {

    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Convert(converter = AuthoritiesConverter.class)
    private Set<GrantedAuthority> authorities;

    @PrePersist
    protected void onCreate() {
        ensureDefaultRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void addRole(String role) {
        this.authorities.add(new SimpleGrantedAuthority(role));
        ensureDefaultRole();
    }

    public void removeRole(String role) {
        this.authorities.remove(new SimpleGrantedAuthority(role));
        ensureDefaultRole();
    }

    private void ensureDefaultRole() {
        if (this.authorities == null) {
            this.authorities = Set.of(new SimpleGrantedAuthority("ROLE_USER"));
        } else this.authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    }
}
