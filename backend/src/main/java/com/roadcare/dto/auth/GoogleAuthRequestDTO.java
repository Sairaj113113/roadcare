package com.roadcare.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleAuthRequestDTO {

    private String name;

    private String email;

    private String photoUrl;
}