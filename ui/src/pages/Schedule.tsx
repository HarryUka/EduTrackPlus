import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function Schedule() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Class Schedule
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                No classes scheduled yet. Check back later!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
} 