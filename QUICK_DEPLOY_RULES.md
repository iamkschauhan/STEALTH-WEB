# Quick Guide: Deploy Firestore Rules

## Method 1: Firebase Console (Recommended - 2 minutes)

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/project/stealthweb-53767/firestore/rules

2. **Copy Rules from File**
   - Open `firestore.rules` in your project
   - Select all (Cmd+A) and copy (Cmd+C)

3. **Paste in Console**
   - Paste into the Firebase Console editor
   - Click **"Publish"** button at the top

4. **Done!** ✅
   - Rules are now live
   - Try saving your profile again

## Method 2: Firebase CLI

If you prefer using CLI:

```bash
# Login (if not already)
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

## What the Rules Allow

✅ Users can create their own profile  
✅ Users can update their own profile  
✅ Users can read other users' profiles  
✅ All authenticated users can access these features

## After Deployment

Once deployed, the "Missing or insufficient permissions" error will be resolved and you can save profiles successfully.
