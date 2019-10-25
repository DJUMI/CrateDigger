import csv
import time
import discogs_client # https://github.com/discogs/discogs_client (Node.js image/video collection possible)

d = discogs_client.Client('ExampleApplication/0.1', user_token = "YsLpfCxaLIMiCtRSzHyQfIjsnWoOQNJpzrJeWOLK")

########### API RESOURCE CHECK SCRATCH WORK ###########
# release = d.release(249504)
# master = release.master
# print ()
# # video_data = release.videos[0]
# # image_url = image_data.get("resource_url")
# # print (video_data)
#######################################################

def convert(styles):

    if not styles:
        return "n/a"

    str1 = ""

    for x in styles:
        str1 += x + " / "

    str1 = str1[: -3]

    return str1

# open raw .csv data file
with open('listing_raw.csv') as csv_file: 
    csv_reader = csv.reader(csv_file, delimiter = ',')
    line_count = 0
    image_error_count = 0
    video_error_count = 0
    write_error_count = 0

    # create new csv file and write to it
    with open('listing.csv', mode = 'w') as out_file:
        out_writer = csv.writer(out_file, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)
        out_writer.writerow(['listing_id', 'artist', 'title', 'label', 'styles', 'format', 'release_id', 'status', 'price', 'listed', 'media_condition', 'image_url', 'video_url'])

        # iterate row by row
        for row in csv_reader:

            # Clear column headers
            if line_count == 0:
                line_count = 1
            else:
                time.sleep(1.5) # abide by discogs pull request frequencies 60 / min
                print(line_count)

                #read from.csv file
                listing_id = row[0]
                artist = row[1]
                title = row[2]
                label = row[3]
                catno = row[4]
                format = row[5]
                release_id = row[6]
                status = row[7]
                price = row[8]
                listed = row[9]
                # comments = row[10] we don 't want this
                media_condition = row[11]

                # fetch from discogs API 
                release = d.release(row[6])
                styles = convert(release.styles)             
                
                # Error thrown if there is no image data in the API. Write out "n/a" instead
                try:
                    image_url = release.images[0].get("resource_url") # dictionary of image data
                except:
                    image_url = "n/a"
                    print("IMAGE ERROR ON LINE " + str(line_count))
                    image_error_count += 1
                    pass
                
                # Error thrown if there is no video data in API. Write out "n/a" instead
                try:
                    video_url = release.videos[0].url
                except:
                    video_url = "n/a"
                    print("VIDEO ERROR ON LINE " + str(line_count))
                    video_error_count += 1
                    pass
                
                # write row of data to .csv
                try: 
                    out_writer.writerow([listing_id, artist, title, label, styles, format, release_id, status, price, listed, media_condition, image_url, video_url])
                    line_count += 1 # successful write
                except UnicodeEncodeError: 
                    print("WRITE ERROR ON LINE " + str(line_count))
                    write_error_count += 1
                    pass

# Caught error summary
print("Image Errors: " + str(image_error_count))
print("Video Errors: " + str(video_error_count))
print("Video Errors: " + str(write_error_count))