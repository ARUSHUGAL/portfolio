package com.arushugal.portfolio.repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import com.arushugal.portfolio.domain.About;
import com.arushugal.portfolio.domain.Certification;
import com.arushugal.portfolio.domain.EducationResponse;
import com.arushugal.portfolio.domain.Experience;
import com.arushugal.portfolio.domain.Project;
import com.arushugal.portfolio.domain.SkillCategory;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * In-memory implementation of {@link ContentRepository} (Requirements 1.1&ndash;1.6, 5.3).
 *
 * <p>Loads {@code content.json} from the classpath at startup via Jackson into an
 * immutable in-memory model. This is the DB-ready seam described in the design:
 * a persistent store could replace this class without touching services or
 * controllers.</p>
 *
 * <p>Experience entries are stored sorted reverse-chronologically by
 * {@code startDate} (descending). Because start dates use the {@code "YYYY-MM"}
 * format, a lexical (string) comparison yields the correct chronological order.</p>
 *
 * <p>All list getters return defensive copies so callers cannot mutate the
 * repository's backing data.</p>
 */
@Repository
public class InMemoryContentRepository implements ContentRepository {

    private static final String CONTENT_RESOURCE = "content.json";

    private final About about;
    private final List<Experience> experience;
    private final List<Project> projects;
    private final List<SkillCategory> skills;
    private final List<Certification> certifications;
    private final EducationResponse education;

    /**
     * Loads and parses {@code content.json} at construction time.
     *
     * @param objectMapper the Spring-managed Jackson mapper
     * @throws IllegalStateException if the content file cannot be found or parsed
     *                               (fail-fast so a misconfigured deployment does
     *                               not start serving empty content)
     */
    public InMemoryContentRepository(ObjectMapper objectMapper) {
        ContentRoot root = load(objectMapper);

        this.about = root.about();

        List<Experience> loadedExperience =
                root.experience() == null ? List.of() : root.experience();
        List<Experience> sorted = new ArrayList<>(loadedExperience);
        // Reverse-chronological by startDate ("YYYY-MM" lexical sort works).
        sorted.sort(Comparator.comparing(
                Experience::startDate,
                Comparator.nullsLast(Comparator.reverseOrder())));
        this.experience = List.copyOf(sorted);

        this.projects = root.projects() == null ? List.of() : List.copyOf(root.projects());
        this.skills = root.skills() == null ? List.of() : List.copyOf(root.skills());
        this.certifications =
                root.certifications() == null ? List.of() : List.copyOf(root.certifications());

        EducationResponse loadedEducation = root.education();
        if (loadedEducation == null) {
            this.education = new EducationResponse(List.of(), List.of(), List.of());
        } else {
            this.education = new EducationResponse(
                    loadedEducation.education() == null
                            ? List.of() : List.copyOf(loadedEducation.education()),
                    loadedEducation.languages() == null
                            ? List.of() : List.copyOf(loadedEducation.languages()),
                    loadedEducation.leadership() == null
                            ? List.of() : List.copyOf(loadedEducation.leadership()));
        }
    }

    private static ContentRoot load(ObjectMapper objectMapper) {
        ClassPathResource resource = new ClassPathResource(CONTENT_RESOURCE);
        if (!resource.exists()) {
            throw new IllegalStateException(
                    "Portfolio content resource not found on classpath: " + CONTENT_RESOURCE);
        }
        try (InputStream in = resource.getInputStream()) {
            ContentRoot root = objectMapper.readValue(in, ContentRoot.class);
            if (root == null || root.about() == null) {
                throw new IllegalStateException(
                        "Portfolio content in " + CONTENT_RESOURCE + " is missing required data");
            }
            return root;
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Failed to load portfolio content from " + CONTENT_RESOURCE, e);
        }
    }

    @Override
    public About getAbout() {
        return about;
    }

    @Override
    public List<Experience> getExperience() {
        return List.copyOf(experience);
    }

    @Override
    public List<Project> getProjects() {
        return List.copyOf(projects);
    }

    @Override
    public List<SkillCategory> getSkills() {
        return List.copyOf(skills);
    }

    @Override
    public List<Certification> getCertifications() {
        return List.copyOf(certifications);
    }

    @Override
    public EducationResponse getEducation() {
        return new EducationResponse(
                List.copyOf(education.education()),
                List.copyOf(education.languages()),
                List.copyOf(education.leadership()));
    }

    /**
     * Private root record mirroring the top-level structure of {@code content.json}.
     */
    private record ContentRoot(
            About about,
            List<Experience> experience,
            List<Project> projects,
            List<SkillCategory> skills,
            List<Certification> certifications,
            EducationResponse education
    ) {
    }
}
