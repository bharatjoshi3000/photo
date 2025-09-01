# 📸 Offline Photo Journal

A simple React Native app built with TypeScript that lets you pick photos from your device, add captions, and store them locally for offline access.

---

## 🙏 Apology  
I want to sincerely apologize that this submission does not fully meet the original requirements. The task asked for offline support along with a sync mechanism and a minimal server, but I was unable to complete those parts.  

I did attempt using SQLite and explored ways to build the server and sync logic, but without prior backend experience I couldn’t get it working in time. To still demonstrate my effort and understanding of React Native, I built this simplified offline-only version using AsyncStorage within one hour.  

I realize this falls short of the complete solution and I deeply regret not being able to deliver everything as expected.  

---

## 🚀 What I Implemented
- Pick images from the device gallery using **react-native-image-picker**  
- Add captions to photos  
- Store photos and captions offline with **AsyncStorage**  
- View saved photos with timestamps  

---

## 🛠️ Tech Choices & Why

### 🔹 TypeScript
- Ensures type safety and reduces runtime errors  
- Improves maintainability & developer experience  

### 🔹 React Native Image Picker
- Native iOS/Android picker support  
- Works seamlessly with CLI (non-Expo) projects  
- Stable and widely used and handles permissions automatically

### 🔹 AsyncStorage
- Lightweight storage for offline-first apps  
- Easy persistence of JSON data  
- Chosen here for simplicity after I faced blockers implementing backend

---

## 📦 Installation
```sh
# Clone the repo
git clone https://github.com/bharatjoshi3000/photo.git

# Install dependencies
npm install
# or
yarn install

# iOS setup
cd ios && pod install && cd ..

# Run on simulator/device
npm run ios
npm run android
