"use client";
// pages/manage-courses.tsx
import { Chapter, Course, IChapter, ICourse } from "@/app/models/Course";
import { MyFooter } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import React, { useState } from "react";

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<IChapter[]>([]);

  const handleAddCourse = async () => {
    const newCourse = new Course({
      title: courseTitle,
      description: courseDescription,
      imageUrl: "",
      chapters: [],
    });

    // Save the new course to the database
    try {
      const savedCourse = await newCourse.save();
      setCourses([...courses, savedCourse]);
      setCourseTitle("");
      setCourseDescription("");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleAddChapter = async () => {
    if (selectedCourseId) {
      const newChapter = new Chapter({
        title: chapterTitle,
        description: chapterDescription,
        videoUrl,
        order: chapters.length + 1,
      });

      // Save the new chapter to the database
      try {
        // const savedChapter = await newChapter.save();
        // setChapters((prevChapters) => [...prevChapters, newChapter]);

        // Reset chapter inputs
        setChapterTitle("");
        setChapterDescription("");
        setVideoUrl("");
      } catch (error) {
        console.error("Error adding chapter:", error);
      }
    }
  };

  const handleSelectCourse = async (courseId: string) => {
    const selectedCourse = courses.find((course) => course._id === courseId);
    if (selectedCourse) {
      setSelectedCourseId(selectedCourse.id);

      try {
        const fetchedChapters = await Promise.all(
          selectedCourse.chapters.map(async (chapterId) => {
            const chapter = await Chapter.findById(chapterId);
            return chapter as IChapter | null;
          })
        );

        setChapters(
          fetchedChapters.filter(
            (chapter): chapter is IChapter => chapter !== null
          )
        );
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await Course.findByIdAndDelete(courseId); // Delete from the database
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      await Chapter.findByIdAndDelete(chapterId); // Delete from the database
      setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Manage Courses</h1>

        <div className="my-4">
          <h2 className="text-xl">Add New Course</h2>
          <input
            type="text"
            placeholder="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="border p-2 my-2 w-full"
          />
          <textarea
            placeholder="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="border p-2 my-2 w-full"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Course
          </button>
        </div>

        <div className="my-4">
          <h2 className="text-xl">Courses List</h2>
          <ul>
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center border p-2 my-2"
              >
                <span
                  onClick={() => handleSelectCourse(course.id)}
                  className="cursor-pointer"
                >
                  {course.title}
                </span>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedCourseId && (
          <div className="my-4">
            <h2 className="text-xl">Add Chapter to Course</h2>
            <input
              type="text"
              placeholder="Chapter Title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="border p-2 my-2 w-full"
            />
            <textarea
              placeholder="Chapter Description"
              value={chapterDescription}
              onChange={(e) => setChapterDescription(e.target.value)}
              className="border p-2 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="border p-2 my-2 w-full"
            />
            <button
              onClick={handleAddChapter}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Chapter
            </button>
          </div>
        )}

        {selectedCourseId && (
          <div className="my-4">
            <h2 className="text-xl">Chapters for Selected Course</h2>
            <ul>
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="flex justify-between items-center border p-2 my-2"
                >
                  <span>{chapter.title}</span>
                  <button
                    onClick={() => handleDeleteChapter(chapter.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <MyFooter />
    </div>
  );
};

export default ManageCourses;
