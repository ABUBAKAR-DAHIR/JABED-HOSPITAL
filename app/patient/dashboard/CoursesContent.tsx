'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton" // make sure you have a Skeleton component, otherwise I can provide one
import { Badge } from "@/components/ui/badge"

export type CourseContentType = {
    courseName: string,
    courseCaption: string,
    coursePrice: string,
    enrolledDate: string,
    enrolled: boolean
}

export default function CoursesContent({courses}: {courses?: CourseContentType[]}) {
    console.log(courses)
//   const [loading, setLoading] = useState(true)
    const loading = !courses
//   const [courses, setCourses] = useState<string[]>([])

//   // Simulate fetching data
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCourses([
//         "Advanced Data Structures",
//         "Algorithms",
//         "Web Development",
//         "Machine Learning",
//       ])
//       setLoading(false)
//     }, 1500)
//     return () => clearTimeout(timer)
//   }, [])

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Your Courses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
            : courses.length == 0? <p>You are not currently enrolled in any course</p>
          : courses.map((course, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{course.courseName}</CardTitle>
                    <Badge>{course.courseCaption}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {course.courseName} is a course that will be going on for 2 to 3 months. We'll do so with live classes and lots of assignments and projects. 
                  </p>
                  <Badge variant="secondary" className="mt-6 max-md:mt-4">{course.enrolled? 'Enrolled' : 'Enrollment Under Review'}</Badge>
                  {/* <button className="mt-3 px-3 py-1 rounded bg-blue-950 text-white hover:bg-blue-900 transition cursor-pointer">
                    View Course
                  </button> */}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}
