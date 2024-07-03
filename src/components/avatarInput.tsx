import React, { ChangeEventHandler, useState, ChangeEvent } from 'react';
import { Avatar, IconButton } from '@mui/material';
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
      <input
        accept="image/*"
        style={{ display: 'none', height: "25vh", width: "25vh" }}
        id="icon-button-file"
        
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          style={{ height: "25vh", width: "25vh" }}
          component="span"
        >
          <Avatar
            sx={{ border: "1px solid black" }}
            src={data["avatar"] as string}
            style={{ height: "25vh", width: "25vh" }}
          >
            {!data["avatar"] && <PhotoCamera />}
          </Avatar>
        </IconButton>
      </label>
    </div>
  );
};