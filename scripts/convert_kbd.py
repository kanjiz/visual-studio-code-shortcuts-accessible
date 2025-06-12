#!/usr/bin/env python3
import re

def convert_shortcut_to_kbd(match):
    """
    キーボードショートカットを<kbd>タグで囲む関数
    """
    content = match.group(1)

    # まず、/ で区切られた部分を処理
    parts = content.split(' / ')
    converted_parts = []

    for part in parts:
        # カンマで区切られた部分を処理
        comma_parts = part.split(', ')
        converted_comma_parts = []

        for comma_part in comma_parts:
            # + で区切って各キーを<kbd>で囲む
            keys = comma_part.split('+')
            converted_keys = []

            for key in keys:
                key = key.strip()
                if key:  # 空でない場合のみ
                    converted_keys.append(f'<kbd>{key}</kbd>')

            if converted_keys:
                converted_comma_parts.append('+'.join(converted_keys))

        if converted_comma_parts:
            converted_parts.append(', '.join(converted_comma_parts))

    result = ' / '.join(converted_parts)
    return f'<td class="shortcut-key">{result}</td>'

# ファイルを読み込む
with open('../index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 正規表現でキーボードショートカットの部分を見つけて変換
pattern = r'<td class="shortcut-key">([^<]+)</td>'
converted_content = re.sub(pattern, convert_shortcut_to_kbd, content)

# ファイルに書き戻す
with open('../index.html', 'w', encoding='utf-8') as f:
    f.write(converted_content)

print("変換完了しました。")
