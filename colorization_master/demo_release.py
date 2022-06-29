
import argparse
import sys
import matplotlib.pyplot as plt

from colorizers import *

# parser = argparse.ArgumentParser()
# parser.add_argument('-i','--img_path', type=str, default='colorization_master/imgs/ansel_adams3.jpg')
# # parser.add_argument('--use_gpu', action='store_true', help='whether to use GPU')
# parser.add_argument('-o','--save_prefix', type=str, default='saved', help='will save into this file with {eccv16.png, siggraph17.png} suffixes')
# opt = parser.parse_args()
print("args0", sys.argv[0] , sys.argv[1][1])
print("args1", sys.argv[1])
args_sent = sys.argv[1].split()
upload_img= args_sent[0] 
save_filename= args_sent[1]

# index = save_filename.rfind(".")
# save_filename = save_filename[:index]

# load colorizers
colorizer_eccv16 = eccv16(pretrained=True).eval()
colorizer_siggraph17 = siggraph17(pretrained=True).eval()
# if(opt.use_gpu):
# 	colorizer_eccv16.cuda()
# 	colorizer_siggraph17.cuda()

# default size to process images is 256x256
# grab L channel in both original ("orig") and resized ("rs") resolutions
# opt.img_path = opt.img_path.lstrip(' ')
img = load_img(upload_img)
(tens_l_orig, tens_l_rs) = preprocess_img(img, HW=(256,256))
# if(opt.use_gpu):
# 	tens_l_rs = tens_l_rs.cuda()

# colorizer outputs 256x256 ab map
# resize and concatenate to original L channel
img_bw = postprocess_tens(tens_l_orig, torch.cat((0*tens_l_orig,0*tens_l_orig),dim=1))
out_img_eccv16 = postprocess_tens(tens_l_orig, colorizer_eccv16(tens_l_rs).cpu())
out_img_siggraph17 = postprocess_tens(tens_l_orig, colorizer_siggraph17(tens_l_rs).cpu())

plt.imsave('./public/colorized/%s.png'%save_filename, out_img_eccv16)
# plt.imsave('%s_siggraph17.png'%opt.save_prefix, out_img_siggraph17)

# plt.figure(figsize=(12,8))
# plt.subplot(2,2,1)
# plt.imshow(img)
# plt.title('Original')
# plt.axis('off')

# plt.subplot(2,2,2)
# plt.imshow(img_bw)
# plt.title('Input')
# plt.axis('off')

# plt.subplot(2,2,3)
# plt.imshow(out_img_eccv16)
# plt.title('Output (ECCV 16)')
# plt.axis('off')

# plt.subplot(2,2,4)
# plt.imshow(out_img_siggraph17)
# plt.title('Output (SIGGRAPH 17)')
# plt.axis('off')
# plt.show()
