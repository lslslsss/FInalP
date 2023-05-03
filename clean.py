import pandas as pd

df = pd.read_csv("/Desktop/IV/FInalP/combined_mbti_df.csv")
df_reduced = df[["mbti","danceability_mean","energy_mean","loudness_mean","mode_mean",
                 "speechiness_mean","acousticness_mean","liveness_mean","valence_mean",
                 "tempo_mean","instrumentalness_mean"]]