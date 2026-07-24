package com.arushugal.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.arushugal.portfolio.domain.About;
import com.arushugal.portfolio.domain.Certification;
import com.arushugal.portfolio.domain.EducationResponse;
import com.arushugal.portfolio.domain.Experience;
import com.arushugal.portfolio.domain.Project;
import com.arushugal.portfolio.domain.SkillCategory;
import com.arushugal.portfolio.repository.ContentRepository;

/**
 * Content retrieval logic (Requirements 1.1&ndash;1.6, 5.3).
 *
 * <p>Thin service layer that delegates to the {@link ContentRepository}. It keeps
 * controllers decoupled from the data source and provides a natural place to add
 * caching or transformation later without changing the web layer.</p>
 */
@Service
public class ContentService {

    private final ContentRepository repository;

    public ContentService(ContentRepository repository) {
        this.repository = repository;
    }

    /** @return the About content (Requirement 1.1) */
    public About getAbout() {
        return repository.getAbout();
    }

    /** @return Experience entries, reverse-chronological (Requirements 1.2, 5.3) */
    public List<Experience> getExperience() {
        return repository.getExperience();
    }

    /** @return Project entries (Requirement 1.3) */
    public List<Project> getProjects() {
        return repository.getProjects();
    }

    /** @return SkillCategory entries (Requirement 1.4) */
    public List<SkillCategory> getSkills() {
        return repository.getSkills();
    }

    /** @return Certification entries (Requirement 1.5) */
    public List<Certification> getCertifications() {
        return repository.getCertifications();
    }

    /** @return the aggregated Education response (Requirement 1.6) */
    public EducationResponse getEducation() {
        return repository.getEducation();
    }
}
