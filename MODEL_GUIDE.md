# 모델 추가 가이드

이 문서는 가구 모델(3D)과 벽지/바닥 텍스처를 프로젝트에 추가하는 절차와
현재 데이터 구조에서 요구되는 모델 특징(메시 이름, 키, 경로 등)을 정리합니다.

## 폴더 구조

- 가구 모델: `public/models/furniture/<category>/<file>.glb`
- 기타 모델: `public/models/<name>.glb`
- 벽지/바닥 텍스처: `public/textures/<category>/<file>.png`

## 가구 모델 요구사항

- 포맷: `glb`
- 메시는 반드시 이름을 가져야 함
- 메시 이름은 `parts` 배열과 `currentColors` 키와 정확히 일치해야 함
- 렌더링 시 `meshToonMaterial`로 색상이 덮어써지므로,
  모델에 포함된 재질/텍스처는 현재 코드에서는 사용되지 않음
- 모델 경로는 `src/data/furniture.json`의 `path`에 등록됨

## 가구 모델 추가 절차

1. 모델 파일 배치  
   예: `public/models/furniture/desk/new_desk.glb`

2. `src/data/furniture.json`에 항목 추가  
   필요한 필드:
   - `key`: 고유 키
   - `name`: 표시 이름
   - `path`: `models/furniture` 기준 경로
   - `category`: `bed | chair | desk`
   - `position`: 초기 배치 좌표
   - `rotation`: 초기 회전(도 단위)
   - `parts`: 메시 이름 목록
   - `currentColors`: 메시 이름별 기본 색상
   - `price`: 가격

   예시:
   ```json
   "new_desk": {
     "key": "new_desk",
     "name": "신규 책상",
     "path": "desk/new_desk.glb",
     "category": "desk",
     "position": [0, 0, 0],
     "rotation": [0, 0, 0],
     "parts": ["top", "legs"],
     "currentColors": {
       "top": "#FFFFFF",
       "legs": "#888888"
     },
     "price": 12
   }
   ```

3. 샵/가방 노출 확인  
   `useShopItem`은 `furniture.json`을 그대로 읽으므로 추가 즉시 샵에 노출됩니다.
   기본 보유 아이템으로 넣고 싶다면 `src/store/useMyBagStore.ts`와
   `src/store/useMyFurnitureStore.ts`의 초기값을 수정하세요.

## 텍스처(벽지/바닥) 추가 절차

1. 이미지 파일 배치  
   예: `public/textures/wallpaper/new_wallpaper.png`

2. `src/data/texture.json`에 항목 추가  
   필요한 필드:
   - `key`, `name`, `path`, `category`, `hasTexture`, `price`

   예시:
   ```json
   "new_wallpaper": {
     "key": "new_wallpaper",
     "name": "신규 벽지",
     "path": "wallpaper/new_wallpaper.png",
     "category": "wallpaper",
     "hasTexture": false,
     "price": 8
   }
   ```

## 현재 등록된 모델 특징

아래는 `src/data/furniture.json` 기준의 모델 키, 파일, 메시 이름(parts)입니다.

| key | file | parts (메시 이름) |
| --- | --- | --- |
| basic_bed | `bed/basic_bed.glb` | `frame`, `mattress`, `pillow`, `covers` |
| basic_chair | `chair/basic_chair.glb` | `frame`, `cushion` |
| single_sofa | `chair/single_sofa.glb` | `sofa`, `legs` |
| basic_desk | `desk/basic_desk.glb` | `desk`, `drawer`, `handle` |
| l_shaped_desk | `desk/l_shaped_desk.glb` | `desk`, `side_desk`, `column`, `book_1`, `book_2`, `book_3`, `book_inside` |
| circular_sitting_table | `desk/circular_sitting_table.glb` | `tableTop`, `legs` |

## 현재 등록된 텍스처 키

벽지:
- `basic_wallpaper` -> `wallpaper/basic_wallpaper.png`
- `sky_wallpaper` -> `wallpaper/sky_wallpaper.png`

바닥:
- `basic_tile` -> `tile/basic_tile.png`
- `white_tile` -> `tile/white_tile.png`

