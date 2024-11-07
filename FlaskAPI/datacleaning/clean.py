import pandas as pd


def read_file(file_path):
    return pd.read_csv(file_path)





if __name__ == '__main__':
    file_name = "../data/job_descriptions.csv"
    df = read_file(file_name)
    print(df)