import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';

export default function Profile() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Student Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                  }}
                >
                  JD
                </Avatar>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body1" color="text.secondary">
                  Student ID: ST12345
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Major
                  </Typography>
                  <Typography variant="body1">Computer Science</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Year Level
                  </Typography>
                  <Typography variant="body1">Junior</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">john.doe@university.edu</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Enrolled Courses
                  </Typography>
                  <Typography variant="body1">4</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
} 