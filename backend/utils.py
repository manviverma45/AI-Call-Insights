
import requests

def download_file(url, save_path):
    """
    Downloads an audio file from a URL and saves it to local path.
    """
    try:
        with requests.get(url, stream=True) as response:
            response.raise_for_status()
            with open(save_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
        print(f"[INFO] File downloaded: {save_path}")
    except Exception as e:
        print(f"[ERROR] Failed to download file: {e}")
        raise
