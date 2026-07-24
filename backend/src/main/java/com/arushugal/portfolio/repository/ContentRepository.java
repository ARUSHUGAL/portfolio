package com.arushugal.portfolio.repository;

import java.util.List;

import com.arushugal.portfolio.domain.About;
import com.arushugal.portfolio.domain.Certification;
import com.arushugal.portfolio.domain.EducationResponse;
import com.arushugal.portfolio.domain.Experience;
import com.arushugal.portfolio.domain.Project;
import com.arushugal.portfolio.domain.SkillCategory;

/**
 * Read-only access to portfolio content.
 *
 * <p>This interface is the DB-ready seam: controllers and services depend on it
 * rather than on a concrete data source, so an in-memory implementation can be
 * swapped for a persistent store without changing higher layers.</p>
 *
 * <p>Each getter mirrors a content endpoint contract described in the design
 * document (Requirements 1.1&ndash;1.6).</p>
 */
public interface ContentRepository {

    /**
     * @return the About content (Requirement 1.1)
     */
    About getAbout();

    /**
     * @return the list of Experience entries (Requirement 1.2)
     */
    List<Experience> getExperience();

    /**
     * @return the list of Project entries (Requirement 1.3)
     */
    List<Project> getProjects();

    /**
     * @return the list of SkillCategory entries (Requirement 1.4)
     */
    List<SkillCategory> getSkills();

    /**
     * @return the list of Certification entries (Requirement 1.5)
     */
    List<Certification> getCertifications();

    /**
     * @return the Education response including education, languages, and leadership (Requirement 1.6)
     */
    EducationResponse getEducation();
}
