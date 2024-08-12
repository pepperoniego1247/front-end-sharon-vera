import React, { ChangeEventHandler, useState, ChangeEvent } from 'react';
import { Avatar, IconButton, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AvatarUploaderProps } from '../helpers/types';

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({ data, setData, loadedData }: AvatarUploaderProps) => {
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData({ ...data, avatar: e.target!.result as string });
      };
      reader.readAsDataURL(file);
    }
    loadedData.refetch();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginBottom: "-6vh" }}>
      <Box
        component="input"
        accept="image/*"
        sx={{ display: 'none', height: { lg: "25vh", xs: "15vh" }, width: { xs: "15vh", lg: "25vh" } }}
        id="icon-button-file"
        
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          sx={{ height: { lg: "25vh", xs: "15vh" }, width: { xs: "15vh", lg: "25vh" } }}
          component="span"
        >
          <Avatar
            sx={{ border: "1px solid black", height: { lg: "25vh", xs: "15vh" }, width: { xs: "15vh", lg: "25vh" } }}
            src={data["avatar"] as string}
          >
            {!data["avatar"] && <PhotoCamera />}
          </Avatar>
        </IconButton>
      </label>
    </div>
  );
};