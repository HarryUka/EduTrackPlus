import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  credits: number;
  faculty?: {
    firstName: string;
    lastName: string;
    title: string;
  };
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course) {
    return (
      <Typography variant="h6">
        Loading course details...
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Course Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {course.code} - {course.name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1">
                  {course.description}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Credits
                </Typography>
                <Typography variant="body1">
                  {course.credits}
                </Typography>
              </Box>
              {course.faculty && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Instructor
                  </Typography>
                  <Typography variant="body1">
                    {course.faculty.title} {course.faculty.firstName} {course.faculty.lastName}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
} 