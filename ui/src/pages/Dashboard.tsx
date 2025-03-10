import { Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  credits: number;
}

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enrolled Courses
              </Typography>
              {courses.map((course) => (
                <Typography key={course.id} variant="body1">
                  {course.code} - {course.name}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Schedule
              </Typography>
              <Typography variant="body1">No upcoming classes</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
} 