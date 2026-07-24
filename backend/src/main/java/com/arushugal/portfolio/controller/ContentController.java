package com.arushugal.portfolio.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arushugal.portfolio.domain.About;
import com.arushugal.portfolio.domain.Certification;
import com.arushugal.portfolio.domain.EducationResponse;
import com.arushugal.portfolio.domain.Experience;
import com.arushugal.portfolio.domain.Project;
import com.arushugal.portfolio.domain.SkillCategory;
import com.arushugal.portfolio.service.ContentService;

/**
 * Read-only content endpoints (Requirements 1.1&ndash;1.7, 5.3).
 *
 * <p>All endpoints are {@code GET}, are prefixed with {@code /api}, and return
 * {@code 200 OK} with {@code application/json}.</p>
 */
@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    /** {@code GET /api/about} (Requirement 1.1). */
    @GetMapping("/about")
    public About getAbout() {
        return contentService.getAbout();
    }

    /** {@code GET /api/experience} (Requirements 1.2, 5.3). */
    @GetMapping("/experience")
    public List<Experience> getExperience() {
        return contentService.getExperience();
    }

    /** {@code GET /api/projects} (Requirement 1.3). */
    @GetMapping("/projects")
    public List<Project> getProjects() {
        return contentService.getProjects();
    }

    /** {@code GET /api/skills} (Requirement 1.4). */
    @GetMapping("/skills")
    public List<SkillCategory> getSkills() {
        return contentService.getSkills();
    }

    /** {@code GET /api/certifications} (Requirement 1.5). */
    @GetMapping("/certifications")
    public List<Certification> getCertifications() {
        return contentService.getCertifications();
    }

    /** {@code GET /api/education} (Requirement 1.6). */
    @GetMapping("/education")
    public EducationResponse getEducation() {
        return contentService.getEducation();
    }
}
