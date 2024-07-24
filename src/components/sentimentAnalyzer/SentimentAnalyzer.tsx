'use client'; // Directiva necesaria para los componentes del cliente

import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import { analyzeSentiment } from '../../utils/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';



interface SentimentResult {
  text: string;
  sentiment: string;
  score: number;
}

const SentimentAnalyzer: React.FC = () => {
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resultsPerPage = 5; // Number of results per page
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (result) => {
          const texts = result.data.map((row: any) => row.text); // Assuming the CSV has a column named "text"
          const analysisResults: SentimentResult[] = [];
          setIsLoading(true);

          for (const text of texts) {
            try {
              const response = await analyzeSentiment(text);
              analysisResults.push({
                text,
                sentiment: response[0].label,
                score: response[0].score,
              });
              setResults([...analysisResults]); // Update results in real-time
            } catch (error) {
              console.error('Error analyzing sentiment:', error);
              analysisResults.push({
                text,
                sentiment: 'Error',
                score: 0,
              });
              setResults([...analysisResults]); // Update results in real-time
            }
          }

          setIsLoading(false);
        },
      });
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

//sx={{ backgroundColor: (theme) => theme.palette.background.default }}

  return (
    <Container  sx={{ backgroundColor: (theme) => theme.palette.background.default, borderRadius:5, padding:3,  }} >
      <Typography variant="h4" component="h1" gutterBottom>
        Sentiment Analyzer
      </Typography>
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
        <Grid container spacing={3}>
            <Grid item xs="auto">
                <Button
                    disabled={ isLoading  == true }
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Carga el archivo
                    <VisuallyHiddenInput type="file"  accept=".csv" onChange={handleFileUpload}/>
                </Button>
            </Grid>
            <Grid item xs={6}>
            {isLoading && <CircularProgress />}
            </Grid>
        </Grid>
      <TableContainer component={Paper}  style={{ marginTop: 20,}}>
        <Table sx={{ minWidth: 50 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Texto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sentimiento</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Puntuación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.text}</TableCell>
                <TableCell>{result.sentiment}</TableCell>
                <TableCell>{result.score.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Pagination
                sx={{ padding: 0, margin: 0}}
                count={totalPages}
                size="small"
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: 20, }}
            /> 
      </Grid>

    </Container>
  );
};

export default SentimentAnalyzer;
