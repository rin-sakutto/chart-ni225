import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

def fetch_ni225_close():
    """
    日経平均公式サイトから日経平均株価(NI225)の最新終値を取得する
    """
    url = "https://indexes.nikkei.co.jp/nkave/"
    response = requests.get(url)
    response.raise_for_status()
    # テキストで終値を抽出
    match = re.search(r'(\d{2,3},\d{3}\.\d{2})', response.text)
    if match:
        close_price = match.group(1).replace(',', '')
        return float(close_price)
    else:
        print("終値の取得に失敗しました。HTML構造を確認してください。")
        return None

def plot_ni225_last_year(csv_path):
    """
    pandasとmatplotlibを使い、ダウンロードしたCSVから過去1年分の終値チャートを描画する
    """
    df = pd.read_csv(csv_path, encoding='shift_jis', header=0, skipfooter=1, engine='python')
    df.columns = ['date', 'close', 'open', 'high', 'low']
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df = df.dropna(subset=['date'])
    one_year_ago = datetime.now() - timedelta(days=365)
    df_last_year = df[df['date'] >= one_year_ago]
    plt.figure(figsize=(12, 6))
    plt.plot(df_last_year['date'], df_last_year['close'], label='NI225 Close')
    plt.title('日経平均株価（過去1年分）')
    plt.xlabel('日付')
    plt.ylabel('終値')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('chart-py/ni225_chart.png')  # 画像として保存
    print('グラフ画像を chart-py/ni225_chart.png に保存しました')
    # plt.show()  # GUI表示はコメントアウト

if __name__ == "__main__":
    close = fetch_ni225_close()
    if close:
        print(f"本日の日経平均終値: {close}")
    else:
        print("終値の取得に失敗しました。")
    plot_ni225_last_year('chart-py/nikkei_hist.csv')